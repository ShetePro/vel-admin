/** 处理环境变量 */
const wrapperEnv = (envConf: Recordable): Partial<ViteEnv> => {
  /** 此处为默认值 */
  const ret: Partial<ViteEnv> = {
    VITE_PORT: 8080,
    VITE_PUBLIC_PATH: "",
    VITE_ROUTER_HISTORY: "",
    VITE_OUT_DIR: "",
  };

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    // 转换布尔值
    if (typeof realName === "string") {
      if (/^(true|false)$/i.test(realName)) {
        realName = JSON.parse(realName.toLowerCase());
      }
    }
    // 转换端口号
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_APP_API_URL") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {}
    }
    ret[envName as keyof ViteEnv] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
};

export { wrapperEnv }
