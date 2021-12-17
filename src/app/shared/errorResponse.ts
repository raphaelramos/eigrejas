import {HttpErrorResponse} from '@angular/common/http';

export const extractErrorMessagesFromErrorResponse = (errorResponse: HttpErrorResponse) => {
  // 1 - Create empty array to store errors
  const errors = [];

  // 2 - check if the error object is present in the response
  if (errorResponse.error) {

    // 3 - Push the main error message to the array of errors
    errors.push(errorResponse.error.message);

    // 4 - Check for Laravel form validation error messages object
    if (errorResponse.error.errors) {

      // 5 - For each error property (which is a form field)
      for (const property in errorResponse.error.errors) {

        if (errorResponse.error.errors.hasOwnProperty(property)) {

          // 6 - Extract it's array of errors
          const propertyErrors: Array<string> = errorResponse.error.errors[property];

          // 7 - Push all errors in the array to the errors array
          propertyErrors.forEach(error => errors.push(error));
        }

      }

    }

  }

  return errors;
};