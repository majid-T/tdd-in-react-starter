import React from "react";
import Joke from "../joke";
import JokeGenerator from "../jokeGenerator";
import { render, Simulate, wait } from "react-testing-library";
import "dom-testing-library/extend-expect";

import * as axios from "axios";
import MockAxios from "axios-mock-adapter";

const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });

afterAll(() => mock.restore());

test("Joke component receives props and then renders text", () => {
  const { getByTestId } = render(<Joke text="The funniest Test this year." />);

  expect(getByTestId("joke-text")).toHaveTextContent(
    "The funniest Test this year."
  );
});

test("JokeGenerator component fetches a random joke and renders it", async () => {
  mock.onGet().replyOnce(200, {
    value: {
      joke: "Some Joke",
    },
  });

  const { getByText, queryByText, queryByTestId } = render(<JokeGenerator />);

  await wait(() => expect(queryByText("Loading...")).not.toBeInTheDOM());
  expect(queryByTestId("joke-test")).toBeInTheDOM();

  expect(getByText("You havent loaded any jokes yet")).toBeInTheDOM();

  Simulate.click(getByText("Load a random joke"));

  //   expect(queryByText("You havent loaded any jokes yet")).not.toBeInTheDOM();
  expect(queryByText("Loading...")).toBeInTheDOM();
});
