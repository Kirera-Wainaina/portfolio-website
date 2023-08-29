import * as React from "react";

export default function Page() {
  return (
    <form>
      <h1>Login</h1>

      <label>
        Email:
        <input type="email" />
      </label>

      <label>
        Password:
        <input type="password" />
      </label>      
    </form>
  )
}