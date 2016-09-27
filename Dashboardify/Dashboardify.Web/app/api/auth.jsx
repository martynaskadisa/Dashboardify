import axios from 'axios'
import Cookies from 'js-cookie'

const rootDomain = `http://${window.location.hostname}/api`

export default {
  login (email, password) {
    let Data = {
      User: {
        Email: email,
        Password: password
      }
    }

    return axios.post(
      `${rootDomain}/login/index`, Data
    )
  },

  logout (ticket) {
    let data = {
      Ticket: ticket
    }

    return axios.post(`${rootDomain}/login/LogOut`, data)
  },

  isLoggedIn () {
    return !!Cookies.get('ticket') // TODO: Add expiration check (dunno if it's necessary here)
  },

  register () {
    // TODO
  },

  isEmailValid (email) {
    // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(email)
  },

  validateEmail (email) {
    if (email.length < 1) {
      return 'Please enter your email'
    }

    if (!this.isEmailValid(email)) {
      return 'Please enter a valid email'
    }

    return ''
  },

  validatePassword (password) {
    if (password.length < 1) {
      return 'Please enter your password'
    }

    return ''
  },

  validateLoginForm (email, password) {
    let validation = {
      hasErrors: false,
      emailError: '',
      passwordError: ''
    }

    validation.emailError = this.validateEmail(email)
    validation.passwordError = this.validatePassword(password)

    if (validation.emailError.length > 0 || validation.passwordError.length > 0) {
      validation.hasErrors = true
    }

    return validation
  },

  validateRegisterForm (name, email, password, repeatPassword, invitationCode) {
    let validation = {
      hasErrors: false,
      nameError: '',
      emailError: '',
      passwordError: '',
      repeatPasswordError: '',
      invitationCodeError: ''
    }

    if (name.length < 1) {
      validation.nameError = 'Please enter your name'
    }

    validation.emailError = this.validateEmail(email)
    validation.passwordError = this.validatePassword(password)

    if (repeatPassword !== password) {
      validation.repeatPasswordError = 'Passwords have to match'
    }

    if (repeatPassword.length < 1) {
      validation.repeatPasswordError = 'Please repeat your password'
    }

    if (invitationCode.length < 1) {
      validation.invitationCodeError = 'Please enter invitation code'
    }

    if (!!validation.nameError || !!validation.emailError || !!validation.passwordError || !!validation.repeatPasswordError || !!validation.invitationCodeError) {
      validation.hasErrors = true
    }

    return validation
  }
}
