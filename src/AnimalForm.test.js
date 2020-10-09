import React from "react";

import AnimalForm from "./AnimalForm";
import { render as r, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockSaveFn = jest.fn();

const render = (props) => r(<AnimalForm save={mockSaveFn} {...props} />);

describe("AnimalForm", () => {
  it("renders the default form values", () => {
    render();
    expect(
      screen.getByPlaceholderText("add favorite animal")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("add favorite fact")
    ).toBeInTheDocument();
  });

  context("when the animal and animal fact is passed in as props", () => {
    it("uses animal as the default value", () => {
      render({ animal: "Cat", animalFact: "Something cool" });
      const input = screen.getByLabelText("animal-input");
      expect(input.value).toBe("Cat");
    });

    it("uses animal fact as the default value", () => {
      render({ animal: "Cat", animalFact: "Something cool" });
      const input = screen.getByLabelText("animal-fact-input");
      expect(input.value).toBe("Something cool");
    });
  });

  it("calls save when there is an update", () => {
    render();
    const animalForm = screen.getByPlaceholderText("add favorite animal");
    const animalFactForm = screen.getByPlaceholderText("add favorite fact");
    const saveButton = screen.getByRole("button");

    userEvent.type(animalForm, "Cat");
    userEvent.type(animalFactForm, "Cats have tails");
    userEvent.click(saveButton);

    expect(mockSaveFn).toHaveBeenCalled();
    expect(mockSaveFn).toHaveBeenCalledWith("Cat", "Cats have tails");
  });
});
