class MedusaError extends Error {
  static Types = {
    INVALID_DATA: 'INVALID_DATA',
    NOT_FOUND: 'NOT_FOUND',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    CONFLICT: 'CONFLICT',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  }

  constructor(type: string, message: string) {
    super(message)
    this.name = 'MedusaError'
  }
}

const medusaError = (error: any) => {
  if (error instanceof MedusaError) {
    throw error
  }

  if (error?.response?.data?.message) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, error.response.data.message)
  }

  if (error?.message) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, error.message)
  }

  throw new MedusaError(MedusaError.Types.INVALID_DATA, "An error occurred")
}

export default medusaError 