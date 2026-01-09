export const GITHUB_API_BASE = 'https://api.github.com'
export const REPO_OWNER = 'Bahamin1'
export const REPO_NAME = 'Certificate-Generator'
export const BRANCH = 'main'

export async function saveCertificateToGitHub(id: string, data: any) {
    const token = process.env.GITHUB_TOKEN
    if (!token) {
        throw new Error('GITHUB_TOKEN is not defined')
    }

    const path = `data/certificates/${id}.json`
    const message = `feat: Add certificate ${id}`
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64')

    const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`

    // Check if file exists to get SHA (for update) - though for new certs it shouldn't exist
    // We'll just try to create. If it exists, we might need sha, but let's assume unique IDs for now.

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
        throw new Error(`GitHub API Error: ${response.status} - ${errorText}`)
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
