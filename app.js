const transferMoney = numbOfAccounts => {
  let accounts = [];
  let higherInterest = 0;
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min + 1) + min;
  };

  // create accounts
  for (let i = 0; i < numbOfAccounts; i++) {
    const account = {
      bank: i,
      cash: 1000,
      capitalizationTime: Math.floor(getRandomNumber(5, 10)),
      transferCost: Math.floor(getRandomNumber(1, 15)),
      interestRate: +getRandomNumber(1, 10).toFixed(2),
    };
    accounts.push(account);
  }

  // setTimout for each account with adding and changing interests rate
  accounts.forEach(account => {
    const handle = setTimeout(function updateInterest() {
      console.log(`Bank ${account.bank}`);
      console.log(`Interest Rate: ${account.interestRate} %`);
      console.log(`Capitalization time: ${account.capitalizationTime}`);
      // -----------------------------------
      // calc interest rate
      const interest = account.cash * (account.interestRate / 100);
      // add interest to cash
      account.cash = +(account.cash + interest).toFixed(2);
      // update interest rate
      account.interestRate = +getRandomNumber(1, 10).toFixed(2);
      // -----------------------------------
      console.log(`Cash: ${account.cash} zł`);
      console.log(`Next Interest Rate: ${account.interestRate} %`);
      // -----------------------------------
      setTimeout(updateInterest, account.capitalizationTime * 1000);
    }, account.capitalizationTime * 1000);
  });

  // get the max capitalization time value
  const maxTime = Math.max(
    ...accounts.map(item => {
      return item.capitalizationTime;
    })
  );
  console.log(maxTime);

  // get the highest interest rate and sum others accounts cash
  const getHighestInterest = () => {
    let updateAccounts = JSON.parse(JSON.stringify(accounts));
    console.log(updateAccounts);

    // get interest rate from all accounts
    const interests = updateAccounts.map(account => {
      return account.interestRate;
    });

    // get max interests rate
    const maxNumber = Math.max(...interests);

    if (interests.includes(higherInterest) && higherInterest >= maxNumber) {
      console.log('same interest');
      return;
    }
    higherInterest = maxNumber;
    console.log('higherinterest ' + higherInterest);

    // get account with the highest interest rate
    const bestAccount = updateAccounts.filter(account => {
      if (account.interestRate === maxNumber) {
        return account;
      }
    });

    // get accounts with lower interest rate
    const otherAccounts = updateAccounts.filter(account => {
      if (account.interestRate !== maxNumber) {
        return account;
      }
    });
    // get cash from accounts with lower interest rate
    const transferAmount = otherAccounts.map(account => {
      const provision = (account.cash - 1000) * (account.transferCost / 100);
      return account.cash - 1000 - provision;
    });
    const sum = transferAmount.reduce((a, b) => {
      return +(a + b).toFixed(2);
    });
    console.log(sum);

    // update accounts array

    // accounts = updateAccounts.map(account => {
    //   if (account.bank === bestAccount[0].bank) {
    //     return { ...account, cash: (account.cash += sum) };
    //   }
    //   return { ...account, cash: 1500 };
    // });

    console.log(accounts);
    console.log(accounts[bestAccount[0].bank].cash);
  };

  setTimeout(function timer() {
    getHighestInterest();
    setTimeout(timer, maxTime * 1000);
  }, maxTime * 1000);
};

transferMoney(2);
