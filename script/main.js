const formContent = document.querySelector('#formContent')
const formSummary = document.querySelector('#formSummary')
const nextBtn = document.querySelector('#nextBtn')
const backBtn = document.querySelector('#backBtn')
const orderBtn = document.querySelector('#orderBtn')
const tooltip = document.querySelector('#tooltip')

const formRows = document.querySelectorAll(
  '.query-params-list:not(.preview-list)'
)
const userInputs = document.querySelectorAll('dd')

let position = 0
let moveForward = true
let isSummaryPage = false

const validate = () => {
  let isValid = true
  if (userInputs[position].classList.contains('fillable-row')) {
    if (userInputs[position].firstElementChild.value === '') {
      triggerError('Field is required')
      return !isValid
    } else {
      removeError()
    }
  }

  if (userInputs[position].classList.contains('checkable-row')) {
    if (
      !userInputs[position].children[0].checked &&
      !userInputs[position].children[2].checked
    ) {
      triggerError('At least 1 must be selected')
      return !isValid
    } else {
      removeError()
    }
  }
  return isValid
}

const triggerError = errorMsg => {
  userInputs[position].classList.add('validation-error')
  userInputs[position].lastElementChild.textContent = errorMsg
}

const removeError = () => {
  userInputs[position].classList.remove('validation-error')
  userInputs[position].lastElementChild.textContent = ''
}

const handleProgressBar = () => {
  const step1 = document.getElementById('step1')
  const step2 = document.getElementById('step2')
  if (isSummaryPage) {
    step1.className = 'passed'
    step2.className = 'active'
  } else {
    step1.className = 'active'
    step2.className = 'passive'
  }
}

const changeActiveRow = () => {
  formRows[position].style.visibility = 'hidden'
  moveForward ? position++ : position--
  formRows[position].style.visibility = 'visible'
  showHideBackbtn()
}

const showHideBackbtn = () => {
  position > 0
    ? (backBtn.style.visibility = 'visible')
    : (backBtn.style.visibility = 'hidden')
}

const showSummaryPage = () => {
  formContent.style.display = 'none'
  formSummary.style.display = 'block'
  generateFreshSummary()
}

const generateFreshSummary = () => {
  const previewList = document.querySelector('.preview-list')
  const questions = []
  const answers = []
  previewList.innerHTML = ''
  formRows.forEach((row, i) => {
    if (i === 2) {
      row.lastElementChild.firstElementChild.checked
        ? answers.push('male')
        : answers.push('female')
    } else if (i === 3) {
      let tmp = ''
      if (row.lastElementChild.firstElementChild.checked) {
        tmp += 'cats; '
      }
      if (row.lastElementChild.children[2].checked) {
        tmp += 'dogs'
      }
      answers.push(tmp)
    } else {
      answers.push(row.lastElementChild.firstElementChild.value)
    }
    questions.push(row.firstElementChild.firstElementChild.textContent)
    const dt = document.createElement('dt')
    const dd = document.createElement('dd')
    dt.textContent = questions[i]
    dd.textContent = answers[i]
    previewList.appendChild(dt)
    previewList.appendChild(dd)
  })
}

const showSuccess = () => {
  const successMsg = document.querySelector('.successMsg')
  successMsg.style.display = 'block'
  step2.className = 'passed'
  backBtn.style.visibility = 'hidden'
  nextBtn.style.visibility = 'hidden'
}

const handleNextBtn = () => {
  let isValid = validate()
  if (isValid) {
    moveForward = true
    if (position === 4) {
      if (isSummaryPage) {
        showSuccess()
        return
      }
      isSummaryPage = true
      nextBtn.textContent = 'Submit'
      showSummaryPage()
      handleProgressBar()
      return
    }
    changeActiveRow()
  }
}

const handleBackBtn = () => {
  moveForward = false
  if (isSummaryPage) {
    isSummaryPage = false
    formContent.style.display = 'block'
    formSummary.style.display = 'none'
    nextBtn.textContent = 'Next'
    handleProgressBar()
    return
  }
  changeActiveRow()
}

const handleOrderBtn = () => {
  const introPage = document.getElementById('introPage')
  const creditCardForm = document.getElementById('creditCardForm')
  introPage.style.display = 'none'
  creditCardForm.style.display = 'block'
}

const toggleTooltip = () => {
  tooltip.nextElementSibling.style.display === 'block'
    ? (tooltip.nextElementSibling.style.display = 'none')
    : (tooltip.nextElementSibling.style.display = 'block')
}

nextBtn.addEventListener('click', handleNextBtn)
backBtn.addEventListener('click', handleBackBtn)
orderBtn.addEventListener('click', handleOrderBtn)
tooltip.addEventListener('click', toggleTooltip)
