import axios from "axios";

class UsdBrlWorker {
  private previousExchangeRate = "0";

  public async run(delaySeconds: number) {
    this.logRunning();
    this.integrateAsync();

    setInterval(() => {
      this.logRunning();

      this.integrateAsync();
    }, delaySeconds * 1000);
  }

  private async integrateAsync() {
    const { data } = await axios.get(process.env.DOLAR_API_BASEURL as string);

    const currentExchangeRate = Number.parseFloat(data.USDBRL.ask).toFixed(2);

    if (this.previousExchangeRate !== currentExchangeRate) {
      if (
        Number.parseFloat(this.previousExchangeRate) >
        Number.parseFloat(currentExchangeRate)
      ) {
        console.log(
          `[UsdBrl Worker]\nDolar caiu 😍 \nDe R$ ${this.previousExchangeRate} para R$ ${currentExchangeRate}`
        );
      } else {
        if (this.previousExchangeRate !== "0") {
          console.log(
            `[UsdBrl Worker]\nDolar subiu 😥 \nDe R$ ${this.previousExchangeRate} para R$ ${currentExchangeRate}`
          );
        }
      }

      this.previousExchangeRate = currentExchangeRate;
    }
  }

  private async logRunning() {
    console.log(`[UsdBrl Worker] running at ${new Date()}`);
  }
}

const usdBrlWorker = new UsdBrlWorker();

export { usdBrlWorker };
