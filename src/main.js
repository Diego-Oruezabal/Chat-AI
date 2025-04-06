import './style.css'
import { createOpenRouter  } from '@openrouter/ai-sdk-provider' 
import { streamText } from 'ai'

const openrouter = createOpenRouter ({
  apiKey: import.meta.env.VITE_OPENROUTER_KEY
})
const app = document.querySelector('#app')
const submitBtn = document.querySelector('#submit')
const form = document.querySelector('#form')
const loader = document.querySelector('#loader')
const promptInput = document.querySelector('#prompt')

form.addEventListener('submit', async e => {
  e.preventDefault()
  const prompt = promptInput.value
  

  if(prompt.trim() === '') {
    alert('Escribe tu consulta')
    return
  }

  submitBtn.disabled = true

  loader.style.display = 'block'  // Mostrar el indicador de carga

  promptInput.value = '' // Borrar el campo de entrada

  const result = streamText({
    // model: openrouter('deepseek/deepseek-v3-base:free'),
    // model: openrouter('google/gemini-2.5-pro-exp-03-25:free'),
    // model: openrouter('qwen/qwen2.5-vl-32b-instruct:free'),
    // model: openrouter('deepseek/deepseek-r1-distill-llama-70b:free'),
    // model: openrouter('allenai/molmo-7b-d:free'),
     model: openrouter('google/gemma-3-4b-it:free'),

    prompt,

    // system: 'Eres un niño de 3 años',
    // system: 'Eres un abuelo de 90 años',
    // system: 'Eres un experto en informatica',
    //  system: 'Eres un ejecutivo en una gran empresa internacional',
  })

  while(app.firstChild) {
    app.removeChild(app.firstChild)
  }
  

  for await ( const text of result.textStream ) {
    app.append(text)
  }

  submitBtn.disabled = false

  loader.style.display = 'none'  // Ocultar el indicador de carga cuando la respuesta se muestra

})