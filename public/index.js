import Web3 from 'web3';
// import Covid19_blockchain from '../build/contracts/Covid19_blockchain.json';
import HealthSystem from '../build/contracts/HealthSystem.json';

let web3;
let crud;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = () => {
    const deploymentKey = Object.keys(HealthSystem.networks)[0];
  return new web3.eth.Contract(
      HealthSystem.abi, 
      HealthSystem
      .networks[deploymentKey]
      .address
  );
};

const initApp = () => {
    const $New_Patient = document.getElementById('newPatientcreate');
    const $New_PatientResult = document.getElementById('newPatientMsg');

    // const $Get_Patients = document.getElementById('showPatients');
    // const $Show_Patients = document.getElementById('getPatients');
 
    const $New_Doctor = document.getElementById('newDoctorcreate');
    const $New_DoctorResult = document.getElementById('newDocMsg');

    const $New_HR = document.getElementById('newHR');
    const $New_HRResult = document.getElementById('newHRMsg');

    const $Get_Disease = document.getElementById('cityToDisease');
    const $Get_DiseaseResult = document.getElementById('getcityResult');

    const $Get_City = document.getElementById('diseaseToCity');
 
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });

  $New_Patient.addEventListener('submit', (e) => {
    e.preventDefault();
        const name = e.target.elements[0].value;
        const yob = e.target.elements[1].value;
        const gender = e.target.elements[2].value;
        const city = e.target.elements[3].value;
        console.log(name, yob, gender, city);
        crud.methods.newPatientReg(name,yob, gender, city).send({from: accounts[0]})
    .then(result => {
      $New_PatientResult.innerHTML = `New Patient ${name} successfully created`;
    })
    .catch(_e => {
      $New_PatientResult.innerHTML = `Ooops... there was an error while trying to create a new Patient ${name}`;
    });
  });

  // $Get_Patients.addEventListener('submit', (e) => {
  //   e.preventDefault();
      
  //   crud.methods.nextPatientId().call()
  //   .then(result => {
  //     // console.log(result);
  //     $Show_Patients.innerHTML=``;
  //     for (let i = 0; i < result; i++) {
  //       crud.methods.Patients_list(i).call()
  //       .then(r => {
  //         console.log(r);
  //       })
  //     }
      
  //     $Show_Patients.innerHTML = `New State successfully created`;
  //   })
  //   .catch(_e => {
  //     $Show_Patients.innerHTML = `Ooops... there was an error while trying to create a new state ${name}`;
  //   });
  // });

  $New_Doctor.addEventListener('submit', (e) => {
    e.preventDefault();
        const name = e.target.elements[0].value;
        const licenceNo = e.target.elements[1].value;
        const spec = e.target.elements[2].value;
        console.log(name, licenceNo, spec);
        crud.methods.newDoctorReg(name, licenceNo, spec).send({from: accounts[0]})
    .then(result => {
      $New_DoctorResult.innerHTML = `Doctor ${name} successfully created`;
    })
    .catch(_e => {
      $New_DoctorResult.innerHTML = `Ooops... there was an error while trying to create a new Doctor ${name}`;
    });
  });

  $New_HR.addEventListener('submit', (e) => {
    e.preventDefault();
        const patientID = e.target.elements[0].value;
        const doctorID = e.target.elements[1].value;
        const prescription = e.target.elements[2].value;
        const feedback = e.target.elements[3].value;
        const disease = e.target.elements[4].value;
        console.log(patientID, doctorID, prescription, feedback, disease);
        crud.methods.newRecordReg(patientID, doctorID, prescription, feedback, disease).send({from: accounts[0]})
    .then(result => {
      $New_HRResult.innerHTML = `New record successfully created`;
    })
    .catch(_e => {
      $New_HRResult.innerHTML = `Ooops... there was an error while creating the Record`;
    });
  });

  $Get_Disease.addEventListener('submit', (e) => {
    e.preventDefault();
    const cityname = e.target.elements[0].value;
    console.log(cityname);
        crud.methods.getDiseaseInCity(cityname).call()
    .then(result => {
        document.getElementById("getcityResult").innerHTML = "";
        for(let i=0;i<result.length;i++){
          // console.log(result[i]);
          var patTemplate = "<tr><th>" + i + "</th><td>" + result[i].name + "</td><td>" + result[i].val + "</td></tr>";
          document.getElementById("getcityResult").innerHTML += (patTemplate);
        }
        // console.log(result, "success");
    })
    .catch(_e => {
      $Get_DiseaseResult.innerHTML = `Ooops... there was an error while trying to get result`;
    });
  });

  $Get_City.addEventListener('submit', (e) => {
    e.preventDefault();
    const diseaseName = e.target.elements[0].value;
    console.log(diseaseName);
        crud.methods.getCityByDisease(diseaseName).call()
    .then(result => {
      document.getElementById("getdiseaseResult").innerHTML = "";
        for(let i=0;i<result.length;i++){
          // console.log(result[i]);
          var patTemplate = "<tr><th>" + i + "</th><td>" + result[i].name + "</td><td>" + result[i].val + "</td></tr>";
          document.getElementById("getdiseaseResult").innerHTML += (patTemplate);
        }
        // console.log(result, "success");
    })
    .catch(_e => {
      $Get_CityResult.innerHTML = `Ooops... there was an error while trying to get result`;
    });
  });

   

  
};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      crud = initContract();
      initApp(); 
    })
        .catch(e => console.log(e.message));
   
});