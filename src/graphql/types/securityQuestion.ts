const schema = `
type SecurityQuestion{
  _id: ID
  question: String
}

# the schema allows the following query:
type Query {
  getSecurityQuestions : [SecurityQuestion]
}

type Mutation {
  addNewSecurityQuestion(question: String!): SecurityQuestion
}

`

export default schema
