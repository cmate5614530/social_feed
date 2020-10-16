import React from "react";

import "./squareloading.css";

import Bee from "../../assets/bee.gif";
export default function squareLoading(props) {
  return (
    <div
      style={{
        width: window.screen.width,
        height: window.screen.height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{ width: "10em", height: "10em" }}>
        <div class="square black" style={{ width: "9em", height: "9em" }}>
          <div class="square black" style={{ width: "8.5em", height: "8.5em" }}>
            <div class="square black" style={{ width: "8em", height: "8em" }}>
              <div
                class="square black"
                style={{ width: "7.5em", height: "7.5em" }}
              >
                <div
                  class="square black"
                  style={{ width: "7em", height: "7em" }}
                >
                  <div
                    class="square black"
                    style={{ width: "6.5em", height: "6.5em" }}
                  >
                    <div
                      class="square black"
                      style={{ width: "6em", height: "6em" }}
                    >
                      <div
                        class="square black"
                        style={{ width: "5.5em", height: "5.5em" }}
                      >
                        <div
                          class="square black"
                          style={{ width: "5em", height: "5em" }}
                        >
                          <div
                            class="square black"
                            style={{ width: "4.5em", height: "4.5em" }}
                          >
                            <div
                              class="square black"
                              style={{ width: "4em", height: "4em" }}
                            >
                              <div
                                class="square black"
                                style={{ width: "3.5em", height: "3.5em" }}
                              >
                                <div
                                  class="square"
                                  style={{
                                    width: "3em",
                                    height: "3em",
                                    background: "violet"
                                  }}
                                >
                                  <img
                                    src={Bee}
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
