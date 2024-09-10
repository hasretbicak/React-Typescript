import React, { useState } from "react";

interface AppProps {
  pageTitle: string;
  content: string;
}

interface User {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
}

function App({ pageTitle, content }: AppProps) {
  const [name, setName] = useState("");
  const [user, setUser] = useState<User>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleSubmitForm(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as HTMLFormElement; //target'ın türünü algılamadığı için HTMLFormElement olarak belirttik.

    const contactFormData = new FormData(target);
    console.log(contactFormData); // Bu şekilde yaptığımızda form geleck fakat içeriği görünmeyeceği için alttaki kodla içeriği görebiliriz.

    const contactFormDataObject = Object.fromEntries(
      contactFormData.entries()
    ) as unknown as Omit<User, "age"> & { age: string }; //hata verdiğinde bilmediğimiz bir tür yapıp sonra türünü User yaptık sadece age'i string olarak aldık.

    // Omit<User, "age">   => User türünde bulunan age bilgisini sil.

    const userData = {
      //age'i number yapmak için yapıyoruz bu kısmı
      firstName: contactFormDataObject.firstName,
      lastName: contactFormDataObject.lastName,
      gender: contactFormDataObject.gender,
      age: Number(contactFormDataObject.age),
    };
    setUser(userData);
  }

  return (
    <>
      <h1>{pageTitle}</h1>
      <p>{content}</p>
      <input type="text" onChange={handleChange} />
      <div> {name}</div>
      <br />
      <br />
      <form onSubmit={handleSubmitForm}>
        <div>
          <label htmlFor="firstName">First Name : </label>
          <input id="firstName" name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name : </label>
          <input id="lastName" name="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="age">Age : </label>
          <input id="age" name="age" type="number" />
        </div>
        <div>
          <label htmlFor="gender">Gender : </label>
          <select name="gender" id="gender">
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </div>
        <button>Submit</button>
      </form>
      <br />
      <br />
      <br />

      <div>
        <div>First Name : {user?.firstName}</div>
        <div>Last Name :{user?.lastName}</div>
        <div> Gender : {user?.gender}</div>
        <div>Age : {user?.age}</div>
      </div>
    </>
  );
}

export default App;
