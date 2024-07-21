import {handleCustomApiRequest} from "./../shared/clientShared.js";

const URL = "http://localhost:3000/api";

function verifyCookies() {
  return handleCustomApiRequest({
    url: `${URL}/verify`,
    method: "GET",
  });
}

function signIn(body) {
  return handleCustomApiRequest({
    url: `${URL}/login`,
    method: "POST",
    body,
  });
}
function signUp(body) {
  return handleCustomApiRequest({
    url: `${URL}/register`,
    method: "POST",
    body,
  });
}
function getAllUserBoards() {
  return handleCustomApiRequest({
    url: `${URL}/users/`,
    method: "GET",
  });
}
function createBoards(body) {
  return handleCustomApiRequest({
    url: `${URL}/boards/`,
    method: "POST",
    body,
  });
}
function inviteUsers(body, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/boards/${boardId}/inviteBoard`,
    method: "POST",
    body,
  });
}
function getUsersBoard(boardId) {
  return handleCustomApiRequest({
    url: `${URL}/users/board/${boardId}`,
    method: "GET",
  });
}
function createSections(body, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/sections/${boardId}/`,
    method: "POST",
    body,
  });
}
function getAllSections(url) {
  return handleCustomApiRequest({
    url: `${url}`,
    method: "GET",
  });
}
function createTasks(body, sectionId) {
  return handleCustomApiRequest({
    url: `${URL}/tasks/${sectionId}/`,
    method: "POST",
    body,
  });
}
function getAllSectionTasks(url) {
  return handleCustomApiRequest({
    url: url,
    method: "GET",
  });
}

export {
  verifyCookies,
  signIn,
  signUp,
  getAllUserBoards,
  createBoards,
  inviteUsers,
  getUsersBoard,
  createSections,
  getAllSections,
  createTasks,
  getAllSectionTasks,
};
