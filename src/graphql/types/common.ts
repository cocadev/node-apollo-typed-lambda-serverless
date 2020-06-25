const schema = `
type CustomResponse{
  status: Int
  message: String
  resultId: ID
}

type Attachment {
  fileUrl: String
  fileName: String
}

type StripeKeys {
  token: String
  source: String
}

# the schema allows the following query:
type Query {
  car(name: String): [Car]
}

type Mutation {
  updateCarName(_id: String!, newName: String!): Car
}


`

export default schema
