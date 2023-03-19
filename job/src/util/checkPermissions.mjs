const checkPermissions = (requestUser, resourseUserId) => {
    if (requestUser.userId === resourseUserId.toString()) return;
throw new Error("Not authenticated to access")
}
export default checkPermissions