export const GITHUB_API_BASE = 'https://api.github.com'
export const REPO_OWNER = 'Bahamin1'
export const REPO_NAME = 'Certificate-Generator'
export const BRANCH = 'main'

export async function saveCertificateToGitHub(id: string, data: any) {
    const token = process.env.GITHUB_TOKEN

    if (!token) {
        console.error('SERVER ERROR: GITHUB_TOKEN is missing from environment variables.')
        throw new Error('Configuration Error: GITHUB_TOKEN is missing. Please add it to Vercel Environment Variables and Redeploy.')
    }

    const path = `data/certificates/${id}.json`
    const message = `feat: Add certificate ${id}`
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64')

    const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`

    console.log(`Attempting to save to GitHub: ${url}`)

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
            message,
            content,
            branch: BRANCH,
        }),
    })

    if (!response.ok) {
        const errorText = await response.text()
        console.error(`GitHub API Failed: ${response.status}`, errorText)
        throw new Error(`GitHub API Error (${response.status}): ${errorText}`)
    }

    return await response.json()
}

export async function saveImageToGitHub(id: string, base64Data: string) {
    const token = process.env.GITHUB_TOKEN

    if (!token) {
        throw new Error('GITHUB_TOKEN is not defined')
    }

    // Remove data:image/png;base64, prefix if present
    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "")
    const path = `data/images/${id}.png`
    const message = `feat: Add certificate image ${id}`

    const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
            message,
            content: cleanBase64,
            branch: BRANCH,
        }),
    })

    if (!response.ok) {
        const errorText = await response.text()
        console.error(`GitHub Image Upload Failed: ${response.status}`, errorText)
        throw new Error(`GitHub Image API Error (${response.status}): ${errorText}`)
    }

    return await response.json()
}

export async function getCertificateFromGitHub(id: string) {
    // Using Raw Content URL for faster/simpler read, or API?
    // API is better to check existence reliably without caching issues of Raw
    const path = `data/certificates/${id}.json`
    const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`

    // No token needed for public repo read? 
    // If repo is public, we can just fetch. If private, we need token.
    // Assuming public for now based on public verify page requirement, but better to use token if available.

    const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
    }

    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(url, { headers, next: { revalidate: 0 } }) // No cache

    if (!response.ok) {
        if (response.status === 404) return null
        throw new Error(`GitHub Fetch Error: ${response.status}`)
    }

    const json = await response.json()
    // Content is base64 encoded
    const content = Buffer.from(json.content, 'base64').toString('utf-8')
    return JSON.parse(content)
}

export async function getImageFromGitHub(id: string) {
    const path = `data/images/${id}.png`
    const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`

    const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
    }

    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(url, { headers, next: { revalidate: 0 } })

    if (!response.ok) {
        if (response.status === 404) return null
        console.error(`GitHub Image Fetch Error: ${response.status}`)
        return null
    }

    const json = await response.json()

    // If file is > 1MB, GitHub API doesn't return content, but provides download_url
    if (!json.content && json.download_url) {
        console.log(`Image > 1MB, fetching from: ${json.download_url}`)
        const blobResponse = await fetch(json.download_url, { headers })
        if (!blobResponse.ok) {
            throw new Error(`GitHub Blob Fetch Error: ${blobResponse.status}`)
        }
        const arrayBuffer = await blobResponse.arrayBuffer()
        const base64 = Buffer.from(arrayBuffer).toString('base64')
        return `data:image/png;base64,${base64}`
    }

    if (!json.content) {
        throw new Error('GitHub API returned no content and no download_url')
    }

    // Content is base64 encoded
    return `data:image/png;base64,${json.content.replace(/\n/g, '')}`
}
