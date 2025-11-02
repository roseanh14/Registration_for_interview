import { render, screen, fireEvent } from "@testing-library/react";
import ApplicationForm from "../components/ApplicationForm.jsx";

test("shows error when required fields are missing", async () => {
  render(<ApplicationForm />);

  fireEvent.change(screen.getByLabelText(/First name/i), {
    target: { value: "Anna" },
  });
  fireEvent.change(screen.getByLabelText(/Last name/i), {
    target: { value: "Lee" },
  });
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "anna@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Requested amount/i), {
    target: { value: "200000" },
  });
  fireEvent.change(screen.getByLabelText(/Repayment period/i), {
    target: { value: "5" },
  });

  const submitBtn = screen.getByRole("button", { name: /submit application/i });
  fireEvent.click(submitBtn);

  const errorMsg = await screen.findByText(
    /please fill in all required fields/i
  );
  expect(errorMsg).toBeInTheDocument();
});