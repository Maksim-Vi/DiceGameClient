export const selectFriends = state => state.players.friends;
export const selectFriendsList = state => state.players.friends.userFriends;
export const selectInvitationsToFriends = state => state.players.friends.invitationsToFriends;
export const selectInvitationsFromFriends = state => state.players.friends.invitationsFromFriends;
export const selectInvitedCount = state => state.players.friends.invitedCount;
export const selectInvitedOpponent = state => state.players.invitedOpponent;
