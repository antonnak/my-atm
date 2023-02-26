import {useState} from 'react';
import './App.css';

const ATMDeposit = ({ onChange, isDeposit, validTransaction, errorMessage}) => {
  console.log(validTransaction);
  let isValid = !validTransaction;
  console.log(isValid);
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <>
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" min="0" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={isValid}></input>
    </label>
      <span className='error-text'>{errorMessage}</span>
    </>
  );
};

const Account = () => {
  const [deposit, setDeposit] = useState(0);
  const [totalState, setTotalState] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);
  const [atmMode, setAtmMode] = useState(""); 
  const [validTransaction, setValidTransaction] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
  const handleChange = (event) => {
    console.log(event.target.value);
    console.log(totalState);
    if (Number(event.target.value)<=0) {
      setValidTransaction(false);
      return;
    } else if (atmMode === "Cash Back" && (Number(event.target.value) > totalState)) {
      console.log(atmMode);
      setValidTransaction(false)
      setErrorMessage('Exceeds your total balance');
    } else {
      setValidTransaction(true)
      console.log(`handleChange ${event.target.value}`);
      setDeposit(Number(event.target.value));
    }
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (e) => {
    e.preventDefault();
    setAtmMode(e.target.value);
    if (e.target.value === "") {return}
    else if (e.target.value === "Deposit"){
      setIsDeposit(true)
      }
      else {setIsDeposit(false)}
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
      <option id="no-selection" value=""></option>
      <option id="deposit-selection" value="Deposit">Deposit</option>
      <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      {
      atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} validTransaction={validTransaction} errorMessage={errorMessage}></ATMDeposit>
      }
    </form>
  );
};
// ========================================
export default Account;
