import Avatar from "@mui/material/Avatar";

function AvatarProfile({color, user, isNavbar}) {
  const isDark = isColorDark(color);
  const FirsLetter = user.username
    ? user.username[0].toUpperCase()
    : user.user.username[0].toUpperCase();
  function isColorDark(hexColor) {
    hexColor = hexColor.replace("#", "");
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    return brightness < 128;
  }
  return (
    <>
      {isDark && !isNavbar && (
        <Avatar
          sx={{
            width: {xs: "50px", sm: "100px"},
            height: {xs: "50px", sm: "100px"},
            objectFit: "cover",
            borderRadius: "50%",
            fontSize: {xs: "1.5rem", sm: "3rem"},
            backgroundColor: color,
            color: "#FFFF",
          }}>
          {FirsLetter}
        </Avatar>
      )}
      {!isDark && !isNavbar && (
        <Avatar
          sx={{
            width: {xs: "50px", sm: "100px"},
            height: {xs: "50px", sm: "100px"},
            objectFit: "cover",
            borderRadius: "50%",
            fontSize: {xs: "1.5rem", sm: "3rem"},
            backgroundColor: color,
            color: "#000",
          }}>
          {FirsLetter}
        </Avatar>
      )}
      {isDark && isNavbar && (
        <Avatar
          sx={{
            width: 32,
            height: 32,
            marginRight: "0.3rem",
            backgroundColor: color,
            color: "#FFFF",
          }}>
          {FirsLetter}
        </Avatar>
      )}
      {!isDark && isNavbar && (
        <Avatar
          sx={{
            width: 32,
            height: 32,
            border: ".5px solid black",
            marginRight: "0.3rem",
            backgroundColor: color,
            color: "#000",
          }}>
          {FirsLetter}
        </Avatar>
      )}
    </>
  );
}

export default AvatarProfile;
