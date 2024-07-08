type Toast = {
  title: string;
  type: "success" | "info" | "error";
  isClosable?: boolean;
} | null;

export default function useToast() {
  const toast = useState<Toast>("toast", () => {
    return null;
  });

  function setToast(data: Toast) {
    toast.value = data;
  }

  return {
    toast,
    setToast,
  };
}
