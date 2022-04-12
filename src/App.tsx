import React from "react";

interface IFormInputValues {
  email: string;
  message: string;
  name: string;
  telephone: string;
}

function getFormValues() {
  const storedValues = localStorage.getItem("form");
  if (!storedValues)
    return {
      email: "",
      message: "",
      name: "",
      telephone: "",
    };
  return JSON.parse(storedValues);
}

function App() {
  const [values, setValues] = React.useState<IFormInputValues>(getFormValues);

  React.useEffect(() => {
    localStorage.setItem("form", JSON.stringify(values));
  }, [values]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Data saved in session storage");
    sessionStorage.setItem("formSession", JSON.stringify(values));
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <main>
      <header>
        <h1>Caching Form Inputs In React</h1>
        <p>
          Forms using localStorage and sessionStorage in react
        </p>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            autoComplete="off"
            type="text"
            name="name"
            id="name"
            placeholder="Mr. Tran Phuoc Huy"
            onChange={handleChange}
            value={values.name}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            placeholder="e.g. user.email@domain.com"
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={values.email}
          />
        </label>
        <label htmlFor="telephone">
          Telephone
          <input
            type="text"
            placeholder="e.g. +233(0)-392-498-2882"
            name="telephone"
            id="telephone"
            onChange={handleChange}
            value={values.telephone}
          />
        </label>
        <label htmlFor="message">
          Message
          <textarea
            name="message"
            id="message"
            value={values.message}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default App;
