import React from "react";

const CreateTransaction = () => {
  return (
    <div>
      <div className="hero has-background-white-light is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <form>
                  <div className="field">
                    <label className="label">Instruction Type</label>
                    <div className="control">
                      <label className="radio">
                        <input type="radio" name="answer" />
                        Immediate
                      </label>
                      <label className="radio">
                        <input type="radio" name="answer" />
                        Standing Instuction
                      </label>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Total Transfer Record</label>
                    <div className="control">
                      <input
                        type="number"
                        className="input"
                        placeholder="Total Transfer Record"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Transfer Amount</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        placeholder="Transfer Amount"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <button className="button is-warning ">Next</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTransaction;
