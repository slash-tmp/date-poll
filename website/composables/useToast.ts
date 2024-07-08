type Toast = {
  title: string;
  type: "success" | "info" | "error";
  isClosable?: boolean;
  timeout?: number;
} | null;

export default function useToast() {
  const toast = useState<Toast>("toast", () => {
    return null;
  });

  function setToast(data: Toast) {
    toast.value = data;

    if (data?.timeout) {
      setTimeout(() => {
        toast.value = null;
      }, data.timeout);
    }
  }

  return {
    toast,
    setToast,
  };
}
