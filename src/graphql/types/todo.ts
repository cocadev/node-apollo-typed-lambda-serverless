const schema = `
type Todo {
  id : ID
  title: String
  complete: String
  UserId: ID
}

# the schema allows the following query:
type Query {
  todos(title: String): [Todo]
}

`

export default schema
