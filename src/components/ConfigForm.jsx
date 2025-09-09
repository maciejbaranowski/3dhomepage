import React, { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'

const Button = ({ children, onClick, className = '', style = {} }) => (
  <button 
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
)

const Input = ({ value, onChange, placeholder, className = '' }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    required
  />
)

function ConfigForm() {
  const { language, translations, toggleLanguage } = useLanguage()
  const [urls, setUrls] = useState([
    { title: 'Google', url: 'https://www.google.com' }
  ])

  const addUrl = (url) => {
    if (urls.length >= 10) {
      alert(translations.maxLimitReached)
      return
    }
    setUrls([...urls, url])
  }

  const updateUrl = (index, field, value) => {
    const newUrls = [...urls]
    newUrls[index][field] = value
    setUrls(newUrls)
  }

  const deleteUrl = (index) => {
    setUrls(urls.filter((_, i) => i !== index))
  }

  const createScene = () => {
    const sceneData = { urls, language }
    const urlParams = new URLSearchParams()
    urlParams.set('scene', JSON.stringify(sceneData))
    window.location.href = `${window.location.pathname}?${urlParams}`
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ 
        backgroundImage: 'url("/textures/background.jpg")',
        backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">3D Homepage</h1>
          <Button
            onClick={toggleLanguage}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {translations.changeLanguage}
          </Button>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-6 text-center">
            {translations.chooseOrTypePages}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {translations.exampleWebpages.map((url, i) => (
              <Button
                key={i}
                onClick={() => addUrl(url)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm"
              >
                {url.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    {translations.path}
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    {translations.title}
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                    {translations.delete}
                  </th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={url.url}
                        onChange={(e) => updateUrl(i, 'url', e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={url.title}
                        onChange={(e) => updateUrl(i, 'title', e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <Button
                        onClick={() => deleteUrl(i)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
                      >
                        ×
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Button
            onClick={() => addUrl({ title: '', url: 'https://' })}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {translations.addAnother}
          </Button>
          
          <div>
            <Button
              onClick={createScene}
              className="bg-red-600 hover:bg-red-700 text-white text-xl px-8 py-4"
            >
              {translations.createScene}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigForm