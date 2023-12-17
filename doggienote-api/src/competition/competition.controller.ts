import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { Competition } from './competition.entity';
import { IsEmpty } from 'class-validator';
import { CompetitionValidation } from './competition.validation';

// export class CreateCompetitionDto{
//     @IsEmpty()
//     name: string;

//     @IsEmpty()
//     competition_country: string;
// }


@Controller('competition')
export class CompetitionController {
  logger = new Logger(CompetitionController.name);
  constructor(private readonly competitionService: CompetitionService) {}

  @Get()
  async findAll(): Promise<Competition[]> {
    return await this.competitionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Competition> {
    const competition = await this.competitionService.findOne(id);
    return competition;
  }

  @Post()
  async createCompetition(
    @Body() competitionData: CompetitionValidation,
  ): Promise<Competition> {
    return await this.competitionService.createCompetition(competitionData);
  }
}
