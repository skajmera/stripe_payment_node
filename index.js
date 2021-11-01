const express=require('express')
const stripe = require('stripe')('sk_test_51JpoPBSDI6axxFW0mavHUEd1G44DwwK6pOJSTR07Ck172ZPoKyIjW0UOUOGCycuDgS2Ug3e8Ix7qn3goJyaxtvf400ZHS1YGQ2');

const app = express();
const port=3001;

app.listen(port,()=>{
  console.log(`working on port ${port}`);
})

const createCustomer=()=>{
  let param={};
  param.email="subhash@gmail.com",
  param.name="subhash",
  param.description="first ",
  
  stripe.customers.create(param,function(err,customer){
      if(err){
        console.log("err "+err);
      }
      if(customer){
        console.log("success "+customer);
      }else{
        console.log("something wrong");
      }
  })
}
// createCustomer()

const retrieveCustomer=()=>{
  stripe.customers.retrieve("cus_KVCTFUZl2hBrZZ",(err,customer)=>{
      if(err){
        console.log("err "+err);
      }
      if(customer){
        console.log("success "+JSON.stringify(customer,null,2));
      }else{
        console.log("something wrong");
      }
  })
}

// retrieveCustomer()

const createToken=()=>{
  let param={};
  param.card={
    number:"4242 4242 4242 4242",
    exp_month:5,
    exp_year:2025,
    cvc:"313"
  }
  stripe.tokens.create(param,function(err,token){
      if(err){
        console.log("err "+err);
      }
      if(token){
        console.log("success "+JSON.stringify(token,null,2));
      }else{
        console.log("something wrong");
      }
  })
}

createToken()

const addCardToCustomer=()=>{ 
  stripe.customers.createSource("cus_KVCTFUZl2hBrZZ",{source: "tok_1JqCFuSDI6axxFW0c79mYXPM"},(err,card)=>{
      if(err){
        console.log("err "+err);
      }
      if(card){
        console.log("success "+JSON.stringify(card,null,2));
      }else{
        console.log("something wrong");
      }
  })
}
// addCardToCustomer()

const chargeCustomerThroughCustomerId=()=>{
  let param={
    amount:"3000",
    currency:'usd',
    description:"first payment",
    customer:"cus_KVCTFUZl2hBrZZ"
  };
  stripe.charges.create(param,(err,charge)=>{
      if(err){
        console.log("err "+err);
      }
      if(charge){
        console.log("success "+JSON.stringify(charge,null,2));
      }else{
        console.log("something wrong");
      }
  })
}

// chargeCustomerThroughCustomerId()

const chargeCustomerThroughTokenId=()=>{
  let param={
    amount:"3000",
    currency:'usd',
    description:"form data",
    source: "tok_1JqsxySDI6axxFW0UUcQfUH8"};
  stripe.charges.create(param,(err,charge)=>{
      if(err){
        console.log("err "+err);
      }
      if(charge){
        console.log("success "+JSON.stringify(charge,null,2));
      }else{
        console.log("something wrong");
      }
  })
}

// chargeCustomerThroughTokenId()

const getAllCustomers=()=>{
  stripe.customers.list({limit:4},(err,customer)=>{
      if(err){
        console.log("err "+err);
      }
      if(customer){
        console.log("success "+JSON.stringify(customer.data,null,2));
      }else{
        console.log("something wrong");
      }
  })
}

// getAllCustomers()
