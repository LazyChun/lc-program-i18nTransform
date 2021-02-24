// 工具基本配置， 在LazyChun上发布或测试时可以获取
export const getConfig = () => {
  const programId = document.getElementById("program_id")?.value;
  const programName = document.getElementById("program_name")?.value;
  const programCode = document.getElementById("program_code")?.value;
  const currentUserStr = document.getElementById("current_user")?.value;
  let currentUser = null;
  if (currentUserStr) {
    console.log("currentUserStr_____________", currentUserStr);
    console.log(
      "currentUserStr_____________",
      decodeURIComponent(currentUserStr)
    );
    // currentUser = JSON.parse(decodeURIComponent(currentUserStr));
  }
  return { programId, programName, programCode, currentUser };
};
