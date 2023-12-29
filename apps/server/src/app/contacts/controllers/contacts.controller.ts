import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactsService } from '../services/contacts.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CreateContactDto } from '../dto/create-contact.dto';
import { User } from '../../auth/user/user.decorator';
import { TokenPayloadDto } from '../../auth/dto/token-payload.dto';
import { ROLE } from '@contacts-app/libs';
import { UpdateContactDto } from '../dto/update-contact.dto';

@Controller('/contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Body() createContactDto: CreateContactDto,
    @User() user: TokenPayloadDto
  ) {
    return this.contactsService.create(createContactDto, user.sub);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@User() user: TokenPayloadDto) {
    if (user.roles.includes(ROLE.ADMIN)) {
      return this.contactsService.findAllForAdmin();
    }

    return this.contactsService.findAll(user.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @User() user: TokenPayloadDto) {
    if (user.roles.includes(ROLE.ADMIN)) {
      return this.contactsService.findOneForAdmin(id);
    }

    return this.contactsService.findOne(id, user.sub);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateContactsDto: UpdateContactDto,
    @User() user: TokenPayloadDto
  ) {
    if (user.roles.includes(ROLE.ADMIN)) {
      return this.contactsService.updateForAdmin(id, updateContactsDto);
    }

    return this.contactsService.update(id, updateContactsDto, user.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @User() user: TokenPayloadDto) {
    if (user.roles.includes(ROLE.ADMIN)) {
      return this.contactsService.removeForAdmin(id);
    }

    return this.contactsService.remove(id, user.sub);
  }
}
