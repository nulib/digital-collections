interface WorkType {
  id: string;
  label: string;
  scheme: string;
}

export default function useWorkType(): object {
  function isMediaType({ id = "" }: WorkType): boolean {
    return ["VIDEO", "AUDIO"].indexOf(id) > -1;
  }

  return {
    isMediaType,
  };
}
