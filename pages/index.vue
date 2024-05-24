<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0 min-width-80 bg-gradient-to-br from-sky-500 to-indigo-500">
            <div class="mt-5 xl:mt-0 flex justify-center justify-between text-center p-8">
                <img src="../assets/imgs/HRCG22_weiss-300x269.png" alt="HRCG" class="mb-5 logo"/>
            </div>

            <div class="h-full w-full">
                <div class="text-center mb-5 text-white">
                    <div class="text-900 text-8xl font-bold mb-3">
                        Welcome,
                    </div>

                    <span class="text-600 font-medium text-3xl">
                        Sign in to continue
                    </span>
                </div>
            </div>

        </div>
        <div class="relative flex items-center justify-center bg-blue-300 min-h-screen w-full">
            <div class="static grid grid-cols-1">       
                <div class="static bg-white p-3 rounded-lg shadow-lg max-w-80">
                    <button class="button"><Icon name="logos:zoho"></Icon> Login with Zoho</button>
                </div>
                
            </div>
        </div>
    </div>

    
  </template>
  
  <script>
 
 
  </script>
  
  <style lang="scss">
    .button {
        background-color: white; 
        color: black; 
        border: 2px solid #008CBA;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        transition-duration: 0.4s;
        padding: 8px 16px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        border-radius: 8px;
    }

    .button:hover {
        background-color: #008CBA;
        color: white;
    }

    .min-width-80 {
      min-width: 80%;
    }
  
    .logo {
      width: 81px;
      height:81px;
    }
  
    .gradient-border-top {
      border-radius:56px;
      padding:0.3rem;
      background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);
    }
  
    .gradient-border-bot {
      border-radius: 53px;
      background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));
    }
  </style>