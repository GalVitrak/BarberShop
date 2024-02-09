import "./register.css";

function Register(): JSX.Element {
    return (
        <div className="register">
              <input type="tel" value={ph} disabled={register} />
              <input
                type="text"
                placeholder="שם פרטי"
                onChange={(e: any) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="שם משפחה"
                onChange={(e: any) => {
                  setLastName(e.target.value);
                }}
              />
              <button type="button" onClick={registerUser}>
                הירשם
              </button>
              50         </div>
    );
}

export default Register;
