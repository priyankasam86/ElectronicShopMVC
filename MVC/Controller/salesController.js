/// <reference path="../Lib/jquery-3.4.1.min.js"/>
///<reference path="../Model/CustomerModel.js"/>
///<reference path="../Model/productModel.js"/>
///<reference path="../Model/salesModel.js"/>

function salesController(salesModel = undefined)
{

    let salesModelObj = salesModel; // Encapsulation

    // Private method

    let getCustomerDataAsync=async function(){

        try{

            return await new Promise((resolve)=>{

                salesModelObj.customerModel.customerName=$("#txtCustomerName").val();
                salesModelObj.customerModel.state=$("#txtState").val();
                salesModelObj.customerModel.customerBankType=$("#ddlBankName option:selected").val();
                salesModelObj.customerModel.paymentMode=$("#ddlPaymentMode option:selected").val();

                return resolve(true);

            });

        }
        catch(ex){

            throw ex;
        }
    }


    let getProductDataAsync=async function(){

        try{

            return await new Promise((resolve)=>{

                salesModelObj.productModel.productName=$("#txtProductName").val();
                salesModelObj.productModel.productPrice=$("#txtProductPrice").val();


                salesModelObj.quantity=$("#txtQuantity").val();

                return resolve(true);
            });

        }
        catch(ex){

            throw ex;
        }
    }


    // Public Method

    this.onSubmit=async function()
    {

        try{

            return await new Promise(async(resolve) =>{


                // get customer model data
                await getCustomerDataAsync();

                // get product model data
                await getProductDataAsync();

                return resolve(true);
            });
            
        }
        catch(ex){

            console.log(ex.message);
            console.log(ex.stack);

        }
    }

    this.onCancel=async function()
    {
        try{

            return await new Promise((resolve)=>{

                $("#txtCustomerName").val(" ");
                $("#ddlBankName").val("Select Bank Name");
                $("#ddlPaymentMode").val("Select Payment Mode");
                $("#txtState").val(" ");

                $("#txtProductName").val(" ");
                $("#txtProductPrice").val(" ");
                $("#txtQuantity").val(" ");

                $("#txtCustomerName").focus();
                
                return resolve(true);
            });

        }
        catch(ex)
        {

            console.log(ex.message);
            console.log(ex.stack);

        }
    }
}

    
function onSubmitButtonClickEvent(){

    let saleControllerObj=null;
    let salesModelObj=null;
    let customerModelObj=null;
    let productModelObj=null;

    try{

        //Create an instance of customer Model Object
        customerModelObj=new customerModel();

        //Create an instance of product Model Object
        productModelObj=new productModel();

        //Create an instance of sales Model object
        salesModelObj=new salesModel();
        salesModelObj.customerModel=customerModelObj; //Bind customer Model Object
        salesModelObj.productModel=productModelObj;  //Bind product Model Object

        //Create an instance of sales controller object
        salesControllerObj=new salesController(salesModelObj);

        salesControllerObj
            .onSubmit()
            .then((resolve)=>console.log(resolve));

    }
    catch(ex){

        console.log(ex.message);
        console.log(ex.stack);
    }

}

function onCancelClickEvent(){

    let saleControllerObj=null;

    try{

        saleControllerObj=new salesController();

        saleControllerObj
        .onCancel()
        .then((resolve) => console.log(resolve));
        
    }
    catch(ex){
        
        console.log(ex.message);
        console.log(ex.stack);
    }
}