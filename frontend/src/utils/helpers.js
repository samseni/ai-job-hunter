export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatRelativeTime(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffDays > 7) return formatDate(dateString)
  if (diffDays > 0) return `${diffDays}d ago`
  if (diffHours > 0) return `${diffHours}h ago`
  if (diffMinutes > 0) return `${diffMinutes}m ago`
  return 'Just now'
}

export function formatSalary(min, max) {
  if (!min && !max) return 'Not specified'
  if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`
  if (min) return `From $${min.toLocaleString()}`
  return `Up to $${max.toLocaleString()}`
}

export function formatNumber(num) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export function getStatusColor(status) {
  const colors = {
    Wishlist: 'slate',
    Applied: 'blue',
    Assessment: 'amber',
    Interview: 'violet',
    Offer: 'emerald',
    Rejected: 'red',
    Saved: 'slate',
  }
  return colors[status] || 'slate'
}

export function getStatusBadge(status) {
  const color = getStatusColor(status)
  return `badge-${color}`
}

export function truncate(str, length = 100) {
  if (!str) return ''
  if (str.length <= length) return str
  return str.slice(0, length).trim() + '...'
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function debounce(fn, delay) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePassword(password) {
  return password.length >= 8
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function isValidFileType(file, allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']) {
  return allowedTypes.includes(file.type)
}

export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase()
}

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  SAVED_JOBS: 'saved_jobs',
  RESUME_TEXT: 'resume_text',
  APPLICATIONS: 'applications',
  PREFERENCES: 'preferences',
}

export function getFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore storage errors
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key)
  } catch {
    // Ignore
  }
}