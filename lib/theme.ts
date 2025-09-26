export interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
  }
  gradients: {
    primary: string
    secondary: string
    accent: string
  }
}

export const themes: Theme[] = [
  {
    id: 'minty-fresh',
    name: 'Minty Fresh',
    colors: {
      primary: '#10B981', // emerald-500
      secondary: '#F3E8FF', // purple-100
      accent: '#A7F3D0', // emerald-200
      background: '#F0FDF4', // emerald-50
      surface: '#FFFFFF',
      text: '#064E3B', // emerald-900
      textSecondary: '#6B7280', // gray-500
      border: '#D1FAE5', // emerald-200
    },
    gradients: {
      primary: 'from-emerald-500 to-emerald-600',
      secondary: 'from-purple-100 to-pink-100',
      accent: 'from-emerald-200 to-emerald-300',
    }
  },
  {
    id: 'lilac-dream',
    name: 'Lilac Dream',
    colors: {
      primary: '#8B5CF6', // violet-500
      secondary: '#FDE2E7', // pink-100
      accent: '#E9D5FF', // violet-200
      background: '#FAF5FF', // violet-50
      surface: '#FFFFFF',
      text: '#4C1D95', // violet-900
      textSecondary: '#6B7280', // gray-500
      border: '#DDD6FE', // violet-200
    },
    gradients: {
      primary: 'from-violet-500 to-violet-600',
      secondary: 'from-pink-100 to-purple-100',
      accent: 'from-violet-200 to-purple-200',
    }
  },
  {
    id: 'blush-harmony',
    name: 'Blush Harmony',
    colors: {
      primary: '#EC4899', // pink-500
      secondary: '#DBEAFE', // blue-100
      accent: '#FDE2E7', // pink-200
      background: '#FDF2F8', // pink-50
      surface: '#FFFFFF',
      text: '#831843', // pink-900
      textSecondary: '#6B7280', // gray-500
      border: '#FBCFE8', // pink-200
    },
    gradients: {
      primary: 'from-pink-500 to-pink-600',
      secondary: 'from-blue-100 to-pink-100',
      accent: 'from-pink-200 to-rose-200',
    }
  },
  {
    id: 'sky-serene',
    name: 'Sky Serene',
    colors: {
      primary: '#3B82F6', // blue-500
      secondary: '#A7F3D0', // emerald-200
      accent: '#DBEAFE', // blue-200
      background: '#EFF6FF', // blue-50
      surface: '#FFFFFF',
      text: '#1E3A8A', // blue-900
      textSecondary: '#6B7280', // gray-500
      border: '#BFDBFE', // blue-200
    },
    gradients: {
      primary: 'from-blue-500 to-blue-600',
      secondary: 'from-emerald-100 to-blue-100',
      accent: 'from-blue-200 to-cyan-200',
    }
  }
]

export const defaultTheme = themes[0] // minty-fresh

export function getThemeById(id: string): Theme {
  return themes.find(theme => theme.id === id) || defaultTheme
}




