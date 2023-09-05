/**
 * @jest-environment jsdom
 */

import Page from "./page";
import { render } from "@testing-library/react";

describe("Form elements are visible", () => {

  test("Displays login title", () => {
    const { getByText } = render(<Page />);  
    expect(getByText("Login")).toBeVisible();
  })

  test("Displays email input", () =>{
    const { getByLabelText } = render(<Page />)
    expect(getByLabelText("Email:")).toBeVisible();
  })

  test("Displays password input", () => {
    const { getByLabelText } = render(<Page />);
    expect(getByLabelText("Password:")).toBeVisible();
  })

  test("Displays submit button", () => {
    const { getByText } = render(<Page />);
    expect(getByText("Submit")).toBeVisible()
  })
  
})

