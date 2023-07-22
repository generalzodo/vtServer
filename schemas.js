// schemas.js
export const Todo = {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      completed: { type: 'boolean' },
      createdAt: { type: 'string', format: 'date-time' }
    }
  };
  
  export const User = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      // Other properties of the User schema
    }
  };
  export const  Error = {
    type: 'object',
    properties: {
      message: { type: 'string' },
      // You can add other properties for error handling, such as status, code, etc.
    }
  };
  // Export other schemas as needed
  