/* eslint-disable no-unused-vars */
import {
  Box,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ChipListProps, ChipProps, OtherMailProps } from './types';

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email: string) => EMAIL_REGEXP.test(email);

export const Chip = ({ email, onCloseClick }: ChipProps) => (
  <Tag key={email} borderRadius="full" variant="solid" colorScheme="green">
    <TagLabel>{email}</TagLabel>
    <TagCloseButton
      onClick={() => {
        onCloseClick(email);
      }}
    />
  </Tag>
);

export const ChipList = ({ emails = [], onCloseClick }: ChipListProps) => (
  <Wrap spacing={1} mb={3}>
    {emails.map((email) => (
      <Chip email={email} key={email} onCloseClick={onCloseClick} />
    ))}
  </Wrap>
);

export const ChipEmailInput = ({ ...rest }) => (
  <Box>
    <Input type="email" {...rest} />
  </Box>
);

export const OtherEmail = ({ emails = [], setEmails }: OtherMailProps) => {
  const [inputValue, setInputValue] = useState('');

  // Checks whether we've added this email already.
  const emailChipExists = (email: string) => emails.includes(email);

  // Add an email to the list, if it's valid and isn't already there.
  const addEmails = (emailsToAdd: Array<string>) => {
    const validatedEmails = emailsToAdd
      .map((e) => e.trim())
      .filter((email: string) => isValidEmail(email) && !emailChipExists(email));

    const newEmails = [...emails, ...validatedEmails];

    setEmails(newEmails);
    setInputValue('');
  };

  // Remove an email from the list.
  const removeEmail = (email: string) => {
    const index = emails.findIndex((e) => e === email);
    if (index !== -1) {
      const newEmails = [...emails];
      newEmails.splice(index, 1);
      setEmails(newEmails);
    }
  };

  // Save input field contents in state when changed.
  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  // Validate and add the email if we press tab, enter or comma.
  const handleKeyDown = (e: any) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();

      addEmails([inputValue]);
    }
  };

  // Split and add emails when pasting.
  const handlePaste = (e: any) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData('text');
    const pastedEmails = pastedData.split(',');
    addEmails(pastedEmails);
  };

  const handleCloseClick = (email: string) => {
    removeEmail(email);
  };

  return (
    <>
      <ChipList emails={emails} onCloseClick={handleCloseClick} />

      {emails.length < 2 && (
        <ChipEmailInput
          placeholder="Enter emails"
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={inputValue}
        />
      )}
    </>
  );
};
