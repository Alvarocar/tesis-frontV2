const now = new Date();

const minDate = new Date(now);

minDate.setFullYear(now.getFullYear() - 75);
minDate.setMonth(0);

const maxDate = new Date(now);

maxDate.setFullYear(now.getFullYear() - 14);
maxDate.setMonth(11);

type TDateRelative = Partial<{ year: number, month: number, day: number  }>;


export class DateRange {

  private startDate?: Date;
  private endDate?: Date;

  static init() {
    return new DateRange()
  }

  setStartDate(year: number, month?: number, day?: number) {
    this.startDate = this.createDateFromParts(year, month, day);
    return this;
  }

  setEndDate(year: number, month?: number, day?: number) {
    this.endDate = this.createDateFromParts(year, month, day);
    return this;
  }

  /**
   * relative year. if you write 1 then the final year will be (current year) + 1.
   * just apply for year.
   */
  setStartDateRelative(params: TDateRelative = {}) {
    this.startDate = this.createDateFromRange(params);
    return this;
  }

  /**
   * relative year. if you write 1 then the final year will be (current year) + 1.
   * just apply for year.
   */
  setEndDateRelative(params: TDateRelative = {}) {
    this.endDate = this.createDateFromRange(params);
    return this;
  }

  private createDateFromRange(params: TDateRelative = {}) {
    const currentDate = new Date();

    const { year = 0, month = 0, day = 0 } = params;
  
    currentDate.setFullYear(currentDate.getFullYear() + year);
    currentDate.setMonth(month);
    currentDate.setDate(day);
    return currentDate;
  }

  private createDateFromParts(year: number, month?: number, day?: number) {
    const date = new Date();
    date.setFullYear(year);
    if (month) {
      date.setMonth(month);
    }
    if (day) {
      date.setDate(day);
    }
    return date;
  }

  get start() {
    return this.startDate;
  }

  get end() {
    return this.endDate;
  }
}
