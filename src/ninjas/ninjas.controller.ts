import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {

    constructor(private readonly  ninjasService: NinjasService) {}

    // get ninjas by their weapon
    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchuks'){
        // const service = new NinjasService();
        // return service.getNinjas(weapon)

        return this.ninjasService.getNinjas(weapon);
    }

    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id:number){
        try {
            return this.ninjasService.getNinja(id);
        } catch (error) {
            throw new NotFoundException();
        }
        
    }

    @Post()
    @UseGuards(BeltGuard)
    createNinja(@Body(new ValidationPipe()) createNinjaDto:CreateNinjaDto){
        return this.ninjasService.createNinja(createNinjaDto)
    }

    @Put(':id')
    updateNinja(@Param('id') id:String, @Body() updateNinjaDto: UpdateNinjaDto){
        return this.ninjasService.updateNinja(+id,updateNinjaDto )
    }

    @Delete(':id')
    removeNinja(@Param('id') id:String){
        return this.ninjasService.removeNinja(+id)

}
}
