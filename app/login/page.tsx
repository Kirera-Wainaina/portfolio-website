import * as React from "react";

export default function Page() {
  return (
    <div className="flex flex-row justify-center items-center h-screen font-sans">
      <form className="w-1/3 h-1/2 shadow-lg flex flex-col">
        <h1 className="self-center font-serif text-2xl">Login</h1>

        <label className="m-10 mb-0">
          Email:
          <input type="email" className="w-full h-10 border-solid border-slate-300 border-2 text-base"/>
        </label>

        <label className="m-10 mb-0">
          Password:
          <input type="password" className="w-full h-10 border-solid border-slate-300 border-2"/>
        </label>

        <button type="submit" className="bg-blue-950 m-10 text-white h-10 rounded">Submit</button>
      </form>
    </div>

  )
}