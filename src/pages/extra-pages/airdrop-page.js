import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
// ==============================|| WalletList PAGE ||============================== //
const AirdopPage = () => {
  const [randomCode, setRandomCode] = useState('');
  const [tokenNum, setTokenNum] = useState(0);
  const [userNum, setUserNum] = useState(0);
  const [comunity, setComunityName] = useState('');
  const [data, setData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const generateCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRandomCode(result);
  };
  const [deadline, setDeadLine] = useState('');
  const handleDeadLine = async (newValue) => {
    setDeadLine(newValue.target.value);
    console.log(deadline);
  };
  const createCode = async () => {
    console.log(tokenNum, userNum, comunity, randomCode, deadline);
    const response = await axios.post('https://marius-server.onrender.com/api/airdrop/create', {
      tokenNum: tokenNum,
      userNum: userNum,
      comunity: comunity,
      randomCode: randomCode,
      deadline: deadline
    });
    console.log('response------>', response);
    if (response.data === 'success') {
      console.log('----------->');
      toast('success', { hideProgressBar: false, autoClose: 2000, type: 'success' });
    }
  };
  const getAirdrop = async () => {
    axios
      .get('https://marius-server.onrender.com/api/airdrop')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTransaction = async () => {
    axios
      .get('https://marius-server.onrender.com/api/airdrop/transaction')
      .then((response) => {
        setTransactionData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAirdrop();
    getTransaction();
  }, []);
  console.log(data);

  return (
    <div className="w-screen">
      <div className="text-[23px] mb-3">Create code</div>
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[20px]">
          <div className="text-[20px]">Token number available for purchase</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={(event) => {
            setTokenNum(event.target.value);
          }}
        ></input>
      </div>
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[20px]">
          <div className="text-[20px]">Users number available for purchase</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={(event) => {
            setUserNum(event.target.value);
          }}
        ></input>
      </div>
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[210px]">
          <div className="text-[20px]">Comunity Name</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={(event) => {
            setComunityName(event.target.value);
          }}
        ></input>
      </div>
      <div className="inline-flex w-full mb-[30px]">
        <input
          disabled={true}
          value={randomCode}
          className="items-center w-[346px] text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:text-black bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
        ></input>
        <button className="rounded-full bg-gray-300 hover:bg-gray-500 ml-[30px]" onClick={generateCode}>
          <div className="mx-[20px]">Generate Code</div>
        </button>
      </div>
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[20px]">
          <div className="text-[20px]">Deadline</div>
        </div>
        <TextField
          id="datetime-local"
          placeholder="Next Appointment"
          type="datetime-local"
          defaultValue="2023-09-02T00:00"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(newValue) => handleDeadLine(newValue)}
        />
        <button className="rounded-full bg-gray-300 hover:bg-gray-500 ml-[30px]" onClick={createCode}>
          <div className="mx-[20px]">Create Code</div>
        </button>
      </div>
      <div className="text-[23px] mb-3">Code List</div>
      <div className="table text-[15px] w-full">
        {data.length != 0 && (
          <div className="table-header-group">
            <div className="table-row">
              <div className="table-cell text-left">No</div>
              <div className="table-cell text-left">Comunity</div>
              <div className="table-cell text-left">Deadline</div>
              <div className="table-cell text-left">Tokens</div>
              <div className="table-cell text-left">Users</div>
              <div className="table-cell text-left">RandomCode</div>
              <div className="table-cell text-left">CreatedDate</div>
            </div>
          </div>
        )}
        <div className="table-row-group">
          {data.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell">{index + 1}</div>
              <div className="table-cell">{item.comunity}</div>
              <div className="table-cell">{item.deadline}</div>
              <div className="table-cell">{item.tokenNum}</div>
              <div className="table-cell">{item.userNum}</div>
              <div className="table-cell">{item.randomCode}</div>
              <div className="table-cell">{item.createAt}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-[23px] mb-3 mt-8">Transaction List</div>
      <div className="table text-[15px]">
        {transactionData.length != 0 && (
          <div className="table-header-group ">
            <div className="table-row text-center border-solid border-black">
              <div className="table-cell text-left border-solid border-black">No</div>
              <div className="table-cell text-left border-solid border-black">Wallet</div>
              <div className="table-cell text-left border-solid border-black">Transaction</div>
              <div className="table-cell text-left border-solid border-black">Code</div>
              <div className="table-cell text-left border-solid border-black">NFTNum</div>
              <div className="table-cell text-left border-solid border-black">Chain</div>
              <div className="table-cell text-left border-solid border-black">Value(sol)</div>
              <div className="table-cell text-left border-solid border-black">Tokens</div>
              <div className="table-cell text-left border-solid border-black">Transaction date</div>
            </div>
          </div>
        )}
        <div className="table-row-group">
          {transactionData.map((item, index) => (
            <div className="table-row border-solid border-black" key={index}>
              <div className="table-cell border-solid border-black">{index + 1}</div>
              <div className="table-cell border-solid border-black">{item.publicKey}</div>
              <div className="table-cell border-solid border-black">{item.transaction}</div>
              <div className="table-cell border-solid border-black">{item.code}</div>
              <div className="table-cell border-solid border-black">{item.nftNum}</div>
              <div className="table-cell border-solid border-black">{item.unit}</div>
              <div className="table-cell border-solid border-black">{item.value}</div>
              <div className="table-cell border-solid border-black">{item.tokens}</div>
              <div className="table-cell border-solid border-black">{item.createdAt}</div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AirdopPage;
