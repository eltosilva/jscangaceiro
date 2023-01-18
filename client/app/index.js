/**@type {Array<HTMLInputElement} */
// |
const campos = [
  document.querySelector('#data'),
  document.querySelector('#valor'),
  document.querySelector('#quantidade')
]

const defaultValues = ['', 0.0, 1]

const tbody = document.querySelector('table tbody')

document.querySelector('.form').addEventListener('submit', function(event){
  event.preventDefault()

  const tr = document.createElement('tr')

  campos.forEach(function(campo){
    const td = document.createElement('td')

    td.textContent = campo.value
    tr.appendChild(td)
  })

  const tdVolume = document.createElement('td')

  tdVolume.textContent = campos[1].value * campos[2].value
  tr.appendChild(tdVolume)
  tbody.appendChild(tr)

  for(let i = 0; i < campos.length; i++)
    campos[i].value = defaultValues[i]
  campos[0].focus();
})