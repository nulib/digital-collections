interface WorkType {
  id: string;
}

export default function useWorkType(): any {
  function isMediaType({ id = "" }: WorkType): boolean {
    return ["VIDEO", "AUDIO"].indexOf(id) > -1;
  }

  return {
    isMediaType,
  };
}
