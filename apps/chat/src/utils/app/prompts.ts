import { PartialBy } from '@/src/types/common';
import { Prompt, PromptInfo } from '@/src/types/prompt';

import { getPromptApiKey, parsePromptApiKey } from '../server/api';
import { constructPath } from './file';
import { splitEntityId } from './folders';

const getGeneratedPromptId = (prompt: PartialBy<Prompt, 'id'>) =>
  constructPath(prompt.folderId, getPromptApiKey(prompt));

export const regeneratePromptId = (prompt: PartialBy<Prompt, 'id'>): Prompt => {
  const newId = getGeneratedPromptId(prompt);
  if (!prompt.id || newId !== prompt.id) {
    return {
      ...prompt,
      id: newId,
    };
  }
  return prompt as Prompt;
};

/**
 * Parses a string for variables in the {{variable}} format and extracts them.
 * @param content The string to be parsed.
 * @returns An array of found variables.
 */
export const parseVariablesFromContent = (content?: string) => {
  const regex = /{{(.*?)}}/g;
  const foundVariables = [];
  let match;

  if (!content) return [];

  while ((match = regex.exec(content)) !== null) {
    foundVariables.push(match[1]);
  }

  return foundVariables;
};

export const getPromptInfoFromId = (id: string): PromptInfo => {
  const { apiKey, bucket, name, parentPath } = splitEntityId(id);
  return regeneratePromptId({
    ...parsePromptApiKey(name),
    folderId: constructPath(apiKey, bucket, parentPath),
  });
};
