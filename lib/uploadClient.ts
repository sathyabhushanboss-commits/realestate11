// Browser-side upload with progress (XHR, because fetch can't report upload progress)
export function uploadFile(file: File, folder: string, onProgress: (pct: number) => void) {
  return new Promise<string>((resolve, reject) => {
    const body = new FormData()
    body.append('file', file)
    body.append('slug', folder)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/upload')
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onload = () => {
      let data: { url?: string; error?: string } = {}
      try {
        data = JSON.parse(xhr.responseText || '{}')
      } catch {}
      if (xhr.status >= 200 && xhr.status < 300 && data.url) resolve(data.url)
      else reject(new Error(data.error || `Upload failed (${xhr.status})`))
    }
    xhr.onerror = () => reject(new Error('Network error during upload'))
    xhr.send(body)
  })
}
