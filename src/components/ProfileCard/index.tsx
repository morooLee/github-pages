import React, { useState } from 'react';
import CardSummary from '../CardSummary';
import ContactList from '../ContactList';
import { Media } from '../Media';

export default function ProfileCard() {
  const [isFolding, handleFolding] = useState(false);

  function toggleFolding() {
    handleFolding(!isFolding);
  }

  function Summary() {
    return (
      <CardSummary
        isFolding={isFolding}
        toggleFolding={toggleFolding}
        className={`w-full flex flex-row justify-between gap-5 ${
          !isFolding && 'pb-5'
        }`}
      >
        <p className="mr-auto flex-1 lg:hidden 2xl:block text-accent text-xl font-semibold">
          @moroo
        </p>
        <ContactList />
      </CardSummary>
    );
  }

  function Details() {
    return (
      <div className="flex flex-col gap-8 lg:gap-5 items-center pt-8 lg:pt-5 2xl:pt-8">
        <img
          src="/assets/moroo.jpg"
          alt="me"
          width="200"
          height="200"
          className="w-50 h-50 rounded mx-auto border"
        />
        <div className="flex flex-col gap-3 items-center">
          <div className="text-center">
            <Media at="lg">
              <p className="text-accent text-xl font-semibold">@moroo</p>
            </Media>
            <Media at="xl">
              <p className="text-accent text-xl font-semibold">@moroo</p>
            </Media>
            <p className="font-bold">Soonhan Lee</p>
          </div>
          <div className="text-center">
            <p>Software Quality Assurance</p>
            <p>Test Automation Engineer</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full xl:w-62 2xl:w-80 bg-canvas border rounded-md p-5 divide-y">
      <Summary />
      {!isFolding && <Details />}
    </section>
  );
}
