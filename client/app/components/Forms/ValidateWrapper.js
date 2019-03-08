import validation from 'validate.js'

export default function validate(fieldName, value) {
    const constraints = {
        email: {
          presence: {
            message: '^Please enter an email address'
          },
          email: {
            message: '^Please enter a valid email address'
          }
        },
        
        password: {
          presence: {
            message: '^Please enter a password'
          },
          length: {
            minimum: 5,
            message: '^Your password must be at least 5 characters'
          }
        },

        username: {
          presence: {
            message: '^Please enter a username or name'
          },
          length: {
            minimum: 1,
            message: '^You have to fill in a username or name'
          }
        },
      }
      

    var formValues = {}
    formValues[fieldName] = value

    var formFields = {}
    formFields[fieldName] = constraints[fieldName]


    const result = validation(formValues, formFields)

    if (result) {
	return result[fieldName][0]
    }
    return null
}
