     pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract Covid19_blockchain{
    struct Indian{
        uint id;
        string state_name;
        uint Covid19_activecases;
        uint Covid19_effectedcases;
        uint Covid19_deaths;
        uint Covid19_recovered;
        
        
    }
    Indian[] public Indian_states;
    uint public nextid;
    
    function New_state(string memory state_name,uint activecases, uint  effectedcases,uint Deaths,uint   Recovered) public{
            uint k=findd_id(state_name);
            if(k==1){
            uint Covid19_activecases=activecases;
            uint Covid19_recovered=Recovered;
            uint Covid19_effectedcases=effectedcases;
            uint Covid19_deaths=Deaths;
            Indian_states.push(Indian(nextid,state_name,Covid19_activecases,Covid19_effectedcases,Covid19_deaths,Covid19_recovered));
            nextid++;}
            else
             revert('This state already exist in blockchain!');
            
        }
        function Search_statename(string memory state_name)view public returns(string memory,uint,string memory,string memory,string memory,uint,string memory,uint,string memory,uint,string memory,uint){
            
            uint i=find_id(state_name);
                    return("Id",Indian_states[i].id,"State name",Indian_states[i].state_name,"Active cases",Indian_states[i].Covid19_activecases,"Effected cases",Indian_states[i].Covid19_effectedcases,"Deaths",Indian_states[i].Covid19_deaths,"Recovered cases",Indian_states[i].Covid19_recovered);
                
                
            
        }
        function Update_state(string memory state_name,uint activecases, uint  effectedcases,uint Deaths,uint   Recovered)public{
             uint i=find_id(state_name);
                  Indian_states[i].state_name=state_name;
                  Indian_states[i].Covid19_activecases=activecases;
                  Indian_states[i].Covid19_effectedcases=effectedcases;
                  Indian_states[i].Covid19_deaths=Deaths;
                  Indian_states[i].Covid19_recovered=Recovered;  
                
                
            
            
        }
        function Delete_state(string memory state_name)public{
            uint i=find_id(state_name);
                  delete Indian_states[i]; 
                
            
        }
        function find_id(string memory state_name)view internal returns(uint){
            for(uint i=0;i<Indian_states.length;i++){
                if(keccak256(abi.encodePacked(Indian_states[i].state_name))== keccak256(abi.encodePacked(state_name)))
                {
                    return i;
                }
            }
            revert('This state does not exist in blockchain!');
        }
         function findd_id(string memory state_name)view internal returns(uint){
             uint k=1;
            for(uint i=0;i<Indian_states.length;i++){
                if(keccak256(abi.encodePacked(Indian_states[i].state_name))== keccak256(abi.encodePacked(state_name)))
                {
                     k=0;
                }
            }
            return k;
           
        }
        
        
        
    
}
        
        
        
